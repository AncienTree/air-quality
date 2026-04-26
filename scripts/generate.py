import argparse
from datetime import datetime, timedelta, timezone
import random
import time
import uuid
import requests

API_URL = "http://localhost:8080/api/measurements"

RANGES = {
    "1h": timedelta(hours=1),
    "24h": timedelta(hours=24),
    "3m": timedelta(days=90),
}

# Fake city IDs for demonstration purposes
CITY_IDS = [
    "city-1", "city-2", "city-3", "city-4",
    "city-5", "city-6", "city-7", "city-8",
    "city-9", "city-10", "city-11", "city-12",
    "city-13", "city-14", "city-15", "city-16",
]


# Function to generate a random timestamp within the specified range
def random_timestamp(range_delta):
    now = datetime.now(timezone.utc)
    start = now - range_delta
    random_seconds = random.randint(0, int(range_delta.total_seconds()))
    
    dt = start + timedelta(seconds=random_seconds)
    return int(dt.timestamp() * 1000)  # Convert to milliseconds


# Function to generate random air quality measurements
def random_measurement():
    return {
        "NO2": round(random.uniform(5, 120), 2),
        "CO": round(random.uniform(0.1, 10), 2),
        "PM10": round(random.uniform(10, 200), 2),
    }


def random_sensor_id():
    return str(uuid.uuid4())


def generate_payload(range):
    range_delta = RANGES[range]    
    
    return {
        "cityId": random.choice(CITY_IDS),
        "sensorId": random_sensor_id(),
        "timestamp": random_timestamp(range_delta),
        **random_measurement(),
    }


def send_payload(payload):
    try:
        r = requests.post(API_URL, json=payload)
        if r.status_code != 201:
            print(f"Failed to send payload: {r.status_code} - {r.text}")
        else:
            print(f"Payload sent successfully: {payload}")
    except Exception as e:
        print(f"Error sending payload: {e}")


def main():
    # Set up argument parser
    prarser = argparse.ArgumentParser(description="Generate air quality data for demo purposes.")
    prarser.add_argument("--count", type=int, default=10, help="Number of data points to generate.")
    prarser.add_argument("--range", choices=["1h", "24h", "3m"], default="1h", help="Time range for the generated data.")
    
    args = prarser.parse_args()
    
    # Generate data based on the provided arguments
    for _ in range(args.count):
        # Generate payload
        payload = generate_payload(args.range)
        
        # Send payload to air quality data endpoint
        send_payload(payload)
        
        # Simulate delay between data points
        time.sleep(0.1)
        
    print("Data generation completed.")
        
    
    
if __name__ == "__main__":
    main()