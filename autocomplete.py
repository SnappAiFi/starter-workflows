from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data for autocomplete suggestions
suggestions = ["apple", "banana", "grape", "orange", "strawberry"]

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '')
    results = [s for s in suggestions if query.lower() in s.lower()]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
