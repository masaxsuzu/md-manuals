import { Snapshot } from "./Snapshot-model";

export interface Log {
    snapshot: Snapshot;
    actionLog: string,
}
