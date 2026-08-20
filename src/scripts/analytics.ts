// SANCTIONED ISLAND #1 — the analytics loader, imported once by BaseLayout, sitewide.
// M1 scope: the module, the sitewide load, and the `grokbotTrack` hook every other
// island calls. §9.7 owns the transport (the bundled Vemetric SDK, cookieless, no PII)
// and M6 wires it — nothing here talks to the network.
// If PUBLIC_VEMETRIC_TOKEN is unset the module installs a no-op stub, so every
// call site stays safe on staging and in local dev (§9.7, §2 Q10/Q11).

type TrackProps = Record<string, string>;
type Tracker = (event: string, props?: TrackProps) => void;

declare global {
  interface Window {
    grokbotTrack?: Tracker;
  }
}

const token = import.meta.env.PUBLIC_VEMETRIC_TOKEN ?? '';

const noop: Tracker = () => {};

// The queue exists so events fired before M6's SDK wiring are never lost — the loader
// drains it once a transport is installed.
const queue: Array<{ event: string; props?: TrackProps }> = [];

const enqueue: Tracker = (event, props) => {
  queue.push({ event, props });
  if (queue.length > 50) queue.shift();
};

window.grokbotTrack = token ? enqueue : noop;

export {};
