import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Mic, Square, Play, Pause, Trash2 } from "lucide-react";

const VoiceRecorder = ({ onRecordingReady }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const playAudio = (mediaBlobUrl) => {
    const audioElement = new Audio(mediaBlobUrl);
    audioElement.onended = () => {
      setIsPlaying(false);
      setAudio(null);
    };
    audioElement.play();
    setAudio(audioElement);
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const removeAudio = (clearBlobUrl) => {
    if (audio) {
      audio.pause();
      setAudio(null);
    }
    setIsPlaying(false);
    clearBlobUrl();
    onRecordingReady(null); 
  };

  return (
    <ReactMediaRecorder
      audio
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl,
      }) => {
        if (mediaBlobUrl) {
          onRecordingReady(mediaBlobUrl);
        }

        return (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 align-middle h-full">
            <div className="flex items-center justify-center">
              {status !== "recording" ? (
                <button
                  onClick={startRecording}
                  className="w-20 h-20 bg-purple-500 hover:bg-purple-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                >
                  <Mic size={32} />
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-20 h-20 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors animate-pulse shadow-lg"
                >
                  <Square size={32} />
                </button>
              )}
            </div>

            {status === "recording" && (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-purple-600">
                  <div className="w-2 h-2 bg-purple-950 rounded-full animate-pulse"></div>
                  <span className="text-sm">Recording...</span>
                </div>
              </div>
            )}

            {mediaBlobUrl && (
              <div className="bg-gray-50 p-4 rounded-lg w-full max-w-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Recording ready</span>
                  <button
                    onClick={() => removeAudio(clearBlobUrl)}
                    className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors"
                    title="Remove recording"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    {!isPlaying ? (
                      <button
                        onClick={() => playAudio(mediaBlobUrl)}
                        className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        <Play size={16} />
                        <span>Play</span>
                      </button>
                    ) : (
                      <button
                        onClick={pauseAudio}
                        className="flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        <Pause size={16} />
                        <span>Pause</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default VoiceRecorder;
