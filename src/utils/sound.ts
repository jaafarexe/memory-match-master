/**
 * Web Audio API synthesizer for Memory Match Master
 * Fully zero-dependency, works offline, no external audio assets needed.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      const savedMute = localStorage.getItem('mmm_sound_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
    } catch {
      this.isMuted = false;
    }
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      localStorage.setItem('mmm_sound_muted', String(muted));
    } catch {
      // ignore
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Snappy card flip sound - quick acoustic pop / whoosh
   */
  public playFlip(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }

  /**
   * Harmonious match sound with streak pitch modulation
   */
  public playMatch(streak: number = 1): void {
    const ctx = this.getContext();
    if (!ctx) return;

    // Base chord frequencies scaled by streak
    const baseFreq = Math.min(660 * Math.pow(1.08, streak - 1), 1200);
    const intervals = [1, 1.25, 1.5]; // Major Triad (Root, Major Third, Fifth)

    intervals.forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const freq = baseFreq * ratio;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.setValueAtTime(0.16, ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.05);
      osc.stop(ctx.currentTime + idx * 0.05 + 0.35);
    });
  }

  /**
   * Gentle mismatch cue - soft descending two-tone click
   */
  public playMismatch(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [260, 210];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.12);
    });
  }

  /**
   * Joyful victory fanfare
   */
  public playWin(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    // Fanfare arpeggio: C5, E5, G5, C6, E6, G6, C7
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    const stepDelay = 0.09;

    fanfareNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === fanfareNotes.length - 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * stepDelay);

      const isFinal = idx === fanfareNotes.length - 1;
      const duration = isFinal ? 0.7 : 0.22;
      const maxVolume = isFinal ? 0.25 : 0.15;

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * stepDelay);
      gain.gain.linearRampToValueAtTime(maxVolume, ctx.currentTime + idx * stepDelay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * stepDelay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * stepDelay);
      osc.stop(ctx.currentTime + idx * stepDelay + duration);
    });
  }

  /**
   * Crisp UI button click
   */
  public playClick(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  }
}

export const soundManager = new SoundManager();
