from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City is required'}), 400

    api_key = '1262b0bacba3469afbf3debf80273b8d'  # Replace with your actual API key
    weather_url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'

    response = requests.get(weather_url)
    if response.status_code == 200:
        data = response.json()
        weather = {
            'city': data['name'],
            'temperature': round(data['main']['temp'], 2),
            'description': data['weather'][0]['description']
        }
        return jsonify(weather)
    else:
        return jsonify({'error': 'City not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
