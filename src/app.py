from flask import Flask, request, jsonify
from chatbot_model_order import ChatbotModelOrder

app = Flask(__name__)

# Initialize the model
bot_order = ChatbotModelOrder()

@app.route('/', methods=['POST'])
def handle_message():
    data = request.json
    message = data.get('message', '')

    # Generate a response using the order bot
    response_text = bot_order.predict(message)

    response = {'reply': response_text}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
