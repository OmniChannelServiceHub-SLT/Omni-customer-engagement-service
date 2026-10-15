const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    notid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    popuP_URL: {
      type: String,
      default: '',
    },

    action: {
      type: String,
      default: '',
    },

    popuP_TYPE: {
      type: String,
      default: '',
    },

    buttoN_TITLE: {
      type: String,
      default: '',
    },

    noT_TYPE: {
      type: String,
      required: true,
    },

    // Preserve the original display date supplied by the source.
    noT_DATE: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'notifications',
    timestamps: true,
    versionKey: false,
    strict: 'throw',
  }
);

module.exports = mongoose.model(
  'SLTNotification',
  NotificationSchema
);