// PCM Processor AudioWorklet — converts float32 audio to int16 PCM
// This file MUST live in public/ and be loaded via audioContext.audioWorklet.addModule()
// Do NOT use ScriptProcessorNode — it is deprecated and causes audio glitches.

class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0]?.[0];
    if (input) {
      const int16 = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      this.port.postMessage(int16, [int16.buffer]);
    }
    return true;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
