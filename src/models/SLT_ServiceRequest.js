const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceRequestSchema = new Schema(
  {
    '@type': {
      type: String,
      default: 'SLTServiceRequest',
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    SRType: {
      type: String,
      required: true,
      trim: true,
    },

    INSArea: {
      type: String,
      required: true,
      trim: true,
    },

    INSSubArea: {
      type: String,
      required: true,
      trim: true,
    },

    ServiceId: {
      type: String,
      required: true,
      trim: true,
    },

    TTSource: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
    },

    notetype: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['received'],
      default: 'received',
    },
  },
  {
    collection: 'serviceRequests',
    timestamps: true,
    versionKey: false,
    strict: 'throw',

    toJSON: {
      virtuals: true,

      transform(doc, result) {
        delete result._id;
        return result;
      },
    },
  }
);

ServiceRequestSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ServiceRequestSchema.virtual('href').get(function () {
  const base = (process.env.PUBLIC_BASE_URL || '')
    .replace(/\/+$/, '');

  return (
    `${base}/api/serviceRequests/` +
    this._id.toHexString()
  );
});

module.exports = mongoose.model(
  'SLTServiceRequest',
  ServiceRequestSchema
);