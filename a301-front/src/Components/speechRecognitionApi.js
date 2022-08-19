class speechRecognitionApi {
  constructor(options) {
    const SpeechToText =
      window.speechRecognition || window.webkitSpeechRecognition;
    this.speechApi = new SpeechToText();
    this.output = options.output
      ? options.output
      : document.createElement("div");
    this.speechApi.continuous = true;
    this.speechApi.interimResults = false;
    this.speechApi.onresult = (event) => {
      let resultIndex = event.resultIndex;
      let transcript = event.results[resultIndex][0].transcript;
      this.output.textContent += transcript;
    };
  }
  init() {
    this.speechApi.start();
  }
  stop() {
    this.speechApi.stop();
  }
}

export default speechRecognitionApi;
