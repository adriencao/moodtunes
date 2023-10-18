import spotipy
import flask
from flask import request, jsonify, Response
from flask_cors import CORS
import random
import requests
import json

app = flask.Flask(__name__)
CORS(app)
token = ""
current_user = ""
db = {}

API_TOKEN = "api-token"
EMOTION_NAMES = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"]
EMOTION_DICT = {
    'angry': {"target_danceability": 0.55, "target_energy": 0.8, "min_popularity": 60, "target_speechiness": 0.28, "target_valence": 0.5,  "min_tempo": 81, "max_tempo": 167, "target_acousticness": 0.15},

    'fear': {"target_danceability": 0.45, "target_energy": 0.36, "min_popularity": 60, "target_speechiness": 0.05, "target_valence": 0.35, "min_tempo": 70, "max_tempo": 145, "target_acousticness": 0.75},

    'happy': {"target_danceability": .8, "target_energy": 0.75, "min_popularity": 60, "target_speechiness": 0.1,  "min_valence": .5, "min_tempo": 100, "max_tempo": 180, "target_acousticness": 0.05},

    'neutral': {"target_danceability": 0.5, "target_energy": 0.5, "target_loudness": 0.5, "min_popularity": 40, "target_speechiness": 0.08, "target_valence": 0.4, "target_tempo": 100, "target_acousticness": 0.5},

    'sad': {"target_danceability": 0.45, "target_energy": 0.32, "min_popularity": 60, "target_speechiness": 0.04, "max_valence": 0.5, "min_tempo": 60, "max_tempo": 145, "target_acousticness": 0.5},
}


@app.route("/login", methods=['GET', 'POST'])
def hello_world():
    post = request.get_json()
    global token
    token = post['data']
    print(token)
    return "POG", 200


@app.route('/upload-image', methods=['POST'])
def upload_image():
    global current_user
    mood_image = request.files['image']
    image_path = ""

    sp = spotipy.Spotify(auth=token)
    current_user = sp.current_user()["id"]
    user_id = sp.current_user()["id"]

    user_name = sp.current_user()["display_name"]
    playlist_name = f"{user_name}'s MoodTunes"
    print(playlist_name)

    if user_id in db:
        playlist = db[user_id]["playlist"]
    else:
        playlist = sp.user_playlist_create(user_id, playlist_name, public=False)
        db[user_id] = {"playlist": playlist}

    if "images" not in db[current_user]:
        image_path = f"{current_user}-1.jpg"
        db[current_user]["images"] = [image_path]
    else:
        image_path = f"{current_user}-{len(db[current_user]['images']) + 1}.jpg"
        db[current_user]["images"].insert(0, image_path)
    mood_image.save(image_path)
    mood = emotions(image_path)
    print(mood)
    dominant_mood = mood["faces"][0]["dominant_emotion"]
    if dominant_mood == "surprise":
        dominant_mood = "fear"
    elif dominant_mood == "disgust":
        dominant_mood = "sad"
    print(dominant_mood)

    playlist_link = create_playlist_and_add_songs_with_link(sp, dominant_mood, user_id, playlist)

    db[current_user]["mood"] = dominant_mood.upper() if dominant_mood != "fear" else "WORRIED"
    print(playlist_link)
    return playlist_link, 200


@app.route('/get-data', methods=['GET'])
def get_data():
    playlist = db[current_user]["playlist"]["external_urls"]["spotify"]
    playlist = playlist.replace("playlist", "embed/playlist")
    db[current_user]["playlistLink"] = playlist
    if db[current_user]["mood"] == "fear":
        db[current_user]["mood"] = "worried"
    return db[current_user], 200


@app.route('/get-image-data1', methods=['GET'])
def get_image_data_1():
    try:
        image_path = db[current_user]["images"][0]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')


@app.route('/get-image-data2', methods=['GET'])
def get_image_data_2():
    try:
        image_path = db[current_user]["images"][1]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')


@app.route('/get-image-data3', methods=['GET'])
def get_image_data_3():
    try:
        image_path = db[current_user]["images"][2]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')

@app.route('/get-image-data4', methods=['GET'])
def get_image_data_4():
    try:
        image_path = db[current_user]["images"][3]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')


@app.route('/get-image-data5', methods=['GET'])
def get_image_data_5():
    try:
        image_path = db[current_user]["images"][4]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')


@app.route('/get-image-data6', methods=['GET'])
def get_image_data_6():
    try:
        image_path = db[current_user]["images"][5]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')

@app.route('/get-image-data7', methods=['GET'])
def get_image_data_7():
    try:
        image_path = db[current_user]["images"][6]
    except:
        image_path = "placeholder.jpg"

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    return Response(image_data, content_type='image/jpeg')

def emotions(image_path):
    url = "https://api.luxand.cloud/photo/emotions"
    headers = {"token": API_TOKEN}
    if image_path.startswith("https://"):
        files = {"photo": image_path}
    else:
        files = {"photo": open(image_path, "rb")}

    response = requests.post(url, headers=headers, files=files)
    result = json.loads(response.text)
    if response.status_code == 200:
        return response.json()
    else:
        print("Can't recognize people:", response.text)
        return None

# Create a new playlist with a specific name based on mood
def create_playlist_and_add_songs_with_link(sp, mood, user_id, playlist):

    # Get recommended songs based on mood
    recommended_songs = recommend_songs_by_mood(sp, mood)  # Adjust audio features as needed

    # Limit amount of songs added to playlist
    recommended_songs = recommended_songs[:5]

    track_uris = [f"spotify:track:{song['uri'].split(':')[-1]}" for song in recommended_songs]
    sp.user_playlist_add_tracks(user_id, playlist["id"], track_uris)

    # Get the link to the created playlist
    playlist_url = playlist['external_urls']['spotify']

    return playlist_url


def recommend_songs_by_mood(sp, mood):
    # Define a seed track to start recommendations
    try:
        if mood == "happy":
            seed_track = random.choice(sp.current_user_top_tracks(limit=10, time_range='short_term')['items'])['uri']
            print(seed_track)
            recommended_tracks = sp.recommendations(
                seed_tracks=[seed_track],
                target_danceability=EMOTION_DICT[mood]["target_danceability"],
                target_energy=EMOTION_DICT[mood]["target_energy"],
                min_popularity=EMOTION_DICT[mood]["min_popularity"],
                target_speechiness=EMOTION_DICT[mood]["target_speechiness"],
                min_valence=EMOTION_DICT[mood]["min_valence"],
                min_tempo=EMOTION_DICT[mood]["min_tempo"],
                max_tempo=EMOTION_DICT[mood]["max_tempo"],
                target_acousticness=EMOTION_DICT[mood]["target_acousticness"]
            )
        elif mood == "sad":
            seed_track = random.choice(sp.current_user_top_tracks(limit=10, time_range='short_term')['items'])['uri']
            recommended_tracks = sp.recommendations(
                seed_tracks=[seed_track],
                target_danceability=EMOTION_DICT[mood]["target_danceability"],
                target_energy=EMOTION_DICT[mood]["target_energy"],
                min_popularity=EMOTION_DICT[mood]["min_popularity"],
                target_speechiness=EMOTION_DICT[mood]["target_speechiness"],
                max_valence=EMOTION_DICT[mood]["max_valence"],
                min_tempo=EMOTION_DICT[mood]["min_tempo"],
                max_tempo=EMOTION_DICT[mood]["max_tempo"],
                target_acousticness=EMOTION_DICT[mood]["target_acousticness"]
            )
        elif mood == "angry":
            seed_track = random.choice(sp.current_user_top_tracks(limit=10, time_range='short_term')['items'])['uri']
            recommended_tracks = sp.recommendations(
                seed_tracks=[seed_track],
                seed_genres=["rap", "rock"],
                target_danceability=EMOTION_DICT[mood]["target_danceability"],
                target_energy=EMOTION_DICT[mood]["target_energy"],
                target_valence=EMOTION_DICT[mood]["target_valence"],
                min_popularity=EMOTION_DICT[mood]["min_popularity"],
                target_speechiness=EMOTION_DICT[mood]["target_speechiness"],
                target_acousticness=EMOTION_DICT[mood]["target_acousticness"]
            )
        elif mood == "neutral":
            seed_track = random.choice(sp.current_user_top_tracks(limit=10, time_range='short_term')['items'])['uri']
            recommended_tracks = sp.recommendations(
                seed_tracks=[seed_track],
                target_danceability=EMOTION_DICT[mood]["target_danceability"],
                target_energy=EMOTION_DICT[mood]["target_energy"],
                target_valence=EMOTION_DICT[mood]["target_valence"],
                min_popularity=EMOTION_DICT[mood]["min_popularity"],
                target_speechiness=EMOTION_DICT[mood]["target_speechiness"],
                target_tempo=EMOTION_DICT[mood]["target_tempo"],
                target_acousticness=EMOTION_DICT[mood]["target_acousticness"]
            )
        else:
            seed_track = random.choice(sp.current_user_top_tracks(limit=10, time_range='short_term')['items'])['uri']
            recommended_tracks = sp.recommendations(
                seed_tracks=[seed_track],
                target_danceability=EMOTION_DICT[mood]["target_danceability"],
                target_energy=EMOTION_DICT[mood]["target_energy"],
                target_valence=EMOTION_DICT[mood]["target_valence"],
                min_popularity=EMOTION_DICT[mood]["min_popularity"],
                target_speechiness=EMOTION_DICT[mood]["target_speechiness"],
                target_acousticness=EMOTION_DICT[mood]["target_acousticness"]
            )
    except:
        print("SEED ERROR")
        recommended_tracks = sp.recommendations(
            seed_genres=["pop"],
            target_danceability=EMOTION_DICT[mood]["target_danceability"],
            target_energy=EMOTION_DICT[mood]["target_energy"],
            min_popularity=EMOTION_DICT[mood]["min_popularity"],
            target_speechiness=EMOTION_DICT[mood]["target_speechiness"],
            target_acousticness=EMOTION_DICT[mood]["target_acousticness"]
        )
    recommended_songs = []

    for track in recommended_tracks['tracks']:
        track_uri = track['uri']
        track_url = track['external_urls']['spotify']
        recommended_songs.append({'uri': track_uri, 'url': track_url})

    return recommended_songs



if __name__ == '__main__':
    app.run(host="localhost", port=8080, debug=True)
