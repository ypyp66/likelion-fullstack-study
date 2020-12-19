import { model, Schema } from 'mongoose';

const CalendarSchema = new Schema(
  {
    content: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const Calendar = model('Calendar', CalendarSchema);

export default Calendar;
