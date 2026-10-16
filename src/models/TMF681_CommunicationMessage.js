const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommunicationMessageSchema = new Schema(
  {
    '@type': {
      type: String,
      default: 'CommunicationMessage',
    },

    '@baseType': String,
    '@schemaLocation': String,

    content: {
      type: String,
      required: true,
    },

    description: String,

    messageType: {
      type: String,
      required: true,
    },

    subject: String,
    priority: String,
    logFlag: Boolean,

    tryTimes: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'tryTimes must be an integer',
      },
    },

    scheduledSendTime: Date,
    sendTime: Date,
    sendTimeComplete: Date,

    state: {
      type: String,
      enum: [
        'initial',
        'inProgress',
        'completed',
        'cancelled',
        'failed',
      ],
      default: 'initial',
    },

    receiver: {
      type: [Schema.Types.Mixed],
      required: true,
      default: undefined,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one receiver is required',
      },
    },

    sender: {
      type: Schema.Types.Mixed,
      required: true,
    },

    attachment: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },

    characteristic: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },
  },
  {
    collection: 'communicationMessages',
    versionKey: false,
    strict: 'throw',
    minimize: false,

    toJSON: {
      virtuals: true,

      transform(doc, result) {
        delete result._id;
        return result;
      },
    },
  }
);

CommunicationMessageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

CommunicationMessageSchema.virtual('href').get(function () {
  const base = (
    process.env.COMMUNICATION_PUBLIC_BASE_URL ||
    process.env.PUBLIC_BASE_URL ||
    ''
  ).replace(/\/+$/, '');

  return (
    `${base}/tmf-api/communicationManagement/v4/` +
    `communicationMessage/${this._id.toHexString()}`
  );
});

module.exports = mongoose.model(
  'CommunicationMessage',
  CommunicationMessageSchema
);