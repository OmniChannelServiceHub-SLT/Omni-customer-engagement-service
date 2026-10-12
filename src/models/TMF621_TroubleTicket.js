const mongoose = require('mongoose');
const { Schema } = mongoose;

const TroubleTicketSchema = new Schema(
  {
    '@type': {
      type: String,
      default: 'TroubleTicket',
    },

    '@baseType': String,
    '@schemaLocation': String,

    name: String,

    description: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      required: true,
    },

    ticketType: {
      type: String,
      required: true,
    },

    priority: String,
    externalId: String,

    status: {
      type: String,
      enum: [
        'acknowledged',
        'rejected',
        'pending',
        'held',
        'inProgress',
        'cancelled',
        'closed',
        'resolved',
      ],
      default: 'acknowledged',
    },

    creationDate: {
      type: Date,
      default: Date.now,
    },

    lastUpdate: {
      type: Date,
      default: Date.now,
    },

    expectedResolutionDate: Date,
    requestedResolutionDate: Date,
    resolutionDate: Date,
    statusChangeDate: Date,
    statusChangeReason: String,

    channel: Schema.Types.Mixed,

    relatedParty: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },

    relatedEntity: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },

    note: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },

    attachment: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },

    statusChange: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },

    troubleTicketRelationship: {
      type: [Schema.Types.Mixed],
      default: undefined,
    },
  },
  {
    collection: 'troubleTickets',
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

TroubleTicketSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TroubleTicketSchema.virtual('href').get(function () {
  const base = (process.env.PUBLIC_BASE_URL || '')
    .replace(/\/+$/, '');

  return (
    `${base}/tmf-api/troubleTicket/v4/troubleTicket/` +
    this._id.toHexString()
  );
});

module.exports = mongoose.model(
  'TroubleTicket',
  TroubleTicketSchema
); 