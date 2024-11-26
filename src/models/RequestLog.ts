// @ts-ignore
import mongoose, { Document, Schema } from 'mongoose';

export interface IRequestLog extends Document {
    body: Record<string, unknown>;
    response?: Record<string, unknown>;
    error?: string;
    createdAt: Date;
}

const RequestLogSchema: Schema = new Schema(
    {
        body: { type: Object, required: true },
        response: { type: Object },
        error: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

export const RequestLog = mongoose.model<IRequestLog>('RequestLog', RequestLogSchema);
