export interface ActivityStream {
  time?: number[];
  distance?: number[];
  latlng?: number[][];
  altitude?: number[];
  heartrate?: number[];
  cadence?: number[];
  watts?: number[];
  temp?: number[];
}

export type CompressedActivityStreamUnit =
  | { r: number; v: number | number[] } // repeat
  | { s: number; i: number } // increment
  | (number | number[]);

export interface CompressedActivityStream {
  time?: CompressedActivityStreamUnit[];
  distance?: CompressedActivityStreamUnit[];
  latlng?: CompressedActivityStreamUnit[];
  altitude?: CompressedActivityStreamUnit[];
  heartrate?: CompressedActivityStreamUnit[];
  cadence?: CompressedActivityStreamUnit[];
  watts?: CompressedActivityStreamUnit[];
  temp?: CompressedActivityStreamUnit[];
}
