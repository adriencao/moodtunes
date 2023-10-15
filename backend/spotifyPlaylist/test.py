import spotipy
import flask
from flask import request, jsonify
from flask_cors import CORS
import sys
import random

token = 'BQAnYLOgRNFwX7os0A6aZev5UyC-5s92x0EyIuodmh4sxpymSpoJGTOuio5CrQ1LogJKSThZmdlzfAQatVXUkWI8XIQObnSWEiHSFhqboQugR3lZjv6I5hQngMRizKRa4VGnWr6Iddk4oS0h4fqD4_EP6vNIufvU6c0Ip6j2JA1fueJ8TPRZkplxGCZSgUtBy31Xfw8ws283fdaKv7yl2-3Of2OmVpX-6djVQSURIw'
sp = spotipy.Spotify(auth=token)
top_artists = sp.current_user_top_artists(time_range="medium_term", limit=10)
print(top_artists)
print(sp.me())

def create_playlist_and_add_songs_with_link(mood):
    # Create a new playlist with a specific name based on mood
    playlist_name = f"Happy Playlist {mood}"
    user_id = sp.current_user()["id"]

    playlist = sp.user_playlist_create(user_id, playlist_name, public=False)

    # Get recommended songs based on mood
    recommended_songs = recommend_songs_by_mood(mood, 0.7, 0.6)  # Adjust audio features as needed

    track_uris = [f"spotify:track:{song['uri'].split(':')[-1]}" for song in recommended_songs]
    sp.user_playlist_add_tracks(user_id, playlist["id"], track_uris)

    # Get the link to the created playlist
    playlist_url = playlist['external_urls']['spotify']

    return playlist_url

# Define a function to recommend songs based on mood
def recommend_songs_by_mood(valence, energy, danceability):
    # Define a seed track to start recommendations
    seed_track = random.choice(sp.current_user_top_tracks(limit=1, time_range='short_term')['items'])['uri']

    target_audio_features = {
        'valence': valence,
        'energy': energy,
        'danceability': danceability,
    }

    recommended_tracks = sp.recommendations(
        seed_tracks=[seed_track],
        target_valence=target_audio_features['valence'],
        target_energy=target_audio_features['energy'],
        target_danceability=target_audio_features['danceability']
    )

    recommended_songs = []

    for track in recommended_tracks['tracks']:
        track_uri = track['uri']
        track_url = track['external_urls']['spotify']
        recommended_songs.append({'uri': track_uri, 'url': track_url})

    return recommended_songs

def calculate_audio_features_from_mood(mood):
    # Calculate valence based on mood
    valence = mood  # Valence is directly related to mood (0.0 to 1.0)

    # Calculate energy based on mood (you can adjust this formula)
    energy = mood * 0.8  # Adjust the factor for energy as needed

    # Calculate danceability based on mood (you can adjust this formula)
    danceability = 0.4 + mood * 0.6  # Adjust the range and factor as needed

    return valence, energy, danceability

# Example usage:
mood = 0.3  # Set the happiness level (0.0 to 1.0)
valence_level, energy_level, danceability_level = calculate_audio_features_from_mood(mood)
recommended_songs = recommend_songs_by_mood(valence_level, energy_level, danceability_level)

for song in recommended_songs:
    print(f"URI: {song['uri']}")
    print(f"URL: {song['url']}")
# created_playlist = create_playlist_and_add_songs(happiness_level)
# print(f"Created playlist '{created_playlist['name']}' and added recommended songs.")
