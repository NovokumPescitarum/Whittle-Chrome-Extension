import speech_recognition
import openai
import pyttsx3
import requests


def ttsRequesthandler(text, speakerId):
    ttsEndPoint = "https://api.wellsaidlabs.com/v1/tts/stream"
    API_KEY = "XXXXXXXX"
    source_code = {'speaker_id':speakerId, 'text':text}
    data = {'api_dev_key':API_KEY,'api_option':'paste','api_paste_code':source_code,'api_paste_format':'python'}
    response = ""
    try:
        response = requests.post(url=ttsEndPoint, data =  data)
    except:
        print("Service is currently unavaible")

    pastebin = response.text
    print("result:", pastebin)
    return pastebin

# GPT-3 Parameters
openai.organization = "ORG-KEY-HERE"
openai.api_key = 'XXXXXXXXXX'

## Speech Recognition Algorithm
recognizer = speech_recognition.Recognizer()
print("Please speak into the microphone:")

## Function which inputs speechtotext into openAI's API
while True:

    try:

        with speech_recognition.Microphone() as mic:

            #Ready the Microphone
            recognizer.adjust_for_ambient_noise(mic, duration=0.2)
            audio = recognizer.listen(mic)
            #Translate speech to text
            SpeechText = recognizer.recognize_google(audio)
            SpeechText = SpeechText.lower()

            ## GPT-3 API
            myPrompt = """
            The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

            Human: Hello, who are you?
            AI: I am an AI created by OpenAI. How can I help you today?
            Human:{SpeechText}
            AI:"""

            # GPT-3 Engine parameters
            start_sequence = "\nAI:"
            restart_sequence = "\nHuman: "
            Addon = "\n"


            response = openai.Completion.create(
                engine="davinci",
                temperature=0.9,
                max_tokens=100,
                top_p=1,
                prompt = str(myPrompt.replace("{SpeechText}", SpeechText)),
                frequency_penalty=0,
                presence_penalty=0.6,
                stop=["\n", "Human:", "AI:"]
            )
            # Print out results for further processing
            saytext = ttsRequesthandler(SpeechText, "3")
            prompt = myPrompt.replace("{SpeechText}", SpeechText),
            #print(f"Human:{SpeechText}\nAI:{response.choices[0].text}")
            print(f"Human:{SpeechText}\nAI:{saytext}")
            # SPEAK IT OUT
            engine = pyttsx3.init()
            
            engine.say(saytext)
            engine.runAndWait()
            exit()

    except speech_recognition.UnknownValueError:
       print("I didn't quite get you. Can you please repeat that?")
       recognizer = speech_recognition.Recognizer()
    continue