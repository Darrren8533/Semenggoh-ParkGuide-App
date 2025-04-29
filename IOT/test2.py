import serial
import time
import mysql.connector
from datetime import datetime
import re

# Define serial port and baud rate
port = 'COM4'  # Changed to COM4 based on your output
baudrate = 9600

# MySQL Database setup
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'parkguide'
}

# Sensor data extraction patterns
patterns = {
    'temperature': r'Temperature: ([\d.]+)',
    'humidity': r'Humidity: ([\d.]+)',
    'motion': r'Motion Detected \(PIR\): (YES|NO)',
    'rain': r'Rain: (YES|NO)',
    'soil_moisture': r'Soil Moisture: (\d+)'
}

try:
    # Connect to MySQL
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    # Create more structured table for sensor data if it doesn't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sensor_readings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        timestamp DATETIME,
        temperature FLOAT,
        humidity FLOAT,
        motion BOOLEAN,
        rain BOOLEAN,
        soil_moisture INT,
        raw_data TEXT
    )
    ''')
    conn.commit()
    
    # Initialize serial connection
    ser = serial.Serial(port, baudrate, timeout=1)
    print(f"Connected to {port} at {baudrate} baud")
    
    # Wait for Arduino to initialize
    time.sleep(2)
    
    reading_group = []
    is_collecting_group = False
    
    # Continuously read and print serial data
    while True:
        if ser.in_waiting > 0:
            timestamp = datetime.now()
            line = ser.readline().decode('utf-8').strip()
            print(f"[{timestamp}] {line}")
            
            # Check if this is the start of a reading group
            if "----- Sensor Readings -----" in line:
                reading_group = []
                is_collecting_group = True
                continue
            
            # Check if this is the end of a reading group
            if "---------------------------" in line and is_collecting_group:
                is_collecting_group = False
                
                # Process the collected group
                if reading_group:
                    # Initialize values
                    temperature = None
                    humidity = None
                    motion = None
                    rain = None
                    soil_moisture = None
                    
                    # Join all lines for raw data storage
                    raw_data = "\n".join(reading_group)
                    
                    # Parse each sensor value
                    for line in reading_group:
                        # Extract temperature
                        temp_match = re.search(patterns['temperature'], line)
                        if temp_match:
                            temperature = float(temp_match.group(1))
                            
                        # Extract humidity
                        humidity_match = re.search(patterns['humidity'], line)
                        if humidity_match:
                            humidity = float(humidity_match.group(1))
                            
                        # Extract motion detection
                        motion_match = re.search(patterns['motion'], line)
                        if motion_match:
                            motion = 1 if motion_match.group(1) == "YES" else 0
                            
                        # Extract rain detection
                        rain_match = re.search(patterns['rain'], line)
                        if rain_match:
                            rain = 1 if rain_match.group(1) == "YES" else 0
                            
                        # Extract soil moisture
                        moisture_match = re.search(patterns['soil_moisture'], line)
                        if moisture_match:
                            soil_moisture = int(moisture_match.group(1))
                    
                    # Store in database
                    cursor.execute('''
                    INSERT INTO sensor_readings 
                    (timestamp, temperature, humidity, motion, rain, soil_moisture, raw_data) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    ''', (timestamp, temperature, humidity, motion, rain, soil_moisture, raw_data))
                    conn.commit()
                    
                    print(f"[{timestamp}] Stored sensor readings in database:")
                    print(f"  Temperature: {temperature}°C")
                    print(f"  Humidity: {humidity}%")
                    print(f"  Motion: {'YES' if motion else 'NO'}")
                    print(f"  Rain: {'YES' if rain else 'NO'}")
                    print(f"  Soil Moisture: {soil_moisture}")
                    print("-" * 40)
                
                continue
            
            # If we're collecting a group, add this line
            if is_collecting_group:
                reading_group.append(line)

except mysql.connector.Error as e:
    # Handle database connection errors
    print(f"Database error: {e}")
except serial.SerialException as e:
    # Handle serial connection errors
    print(f"Serial error: {e}")
except KeyboardInterrupt:
    # Handle user termination (Ctrl+C)
    print("\nProgram terminated by user")
finally:
    # Ensure serial port is closed when the program exits
    if 'ser' in locals() and ser.is_open:
        ser.close()
        print("Serial port closed")
    
    # Close database connection
    if 'conn' in locals() and 'cursor' in locals():
        cursor.close()
        conn.close()
        print("Database connection closed")
