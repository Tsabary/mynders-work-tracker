type WorkLog = {
  _id: string;
  user_id: string;
  comments: string;
  date_range: {
    from: Date;
    to: Date | null;
  };
};
