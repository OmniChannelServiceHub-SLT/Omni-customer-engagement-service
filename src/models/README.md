# Models

Add Customer Engagement TMF/Mongoose models here.

Recommended convention:

- One file per TMF resource/schema.
- Reuse compiled Mongoose models to avoid duplicate-model crashes:

```js
module.exports =
  mongoose.models.ModelName ||
  mongoose.model('ModelName', schema);
```
