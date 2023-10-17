//? extends need for check {error instanceof ApiError}
//? And response 400 or 500

export class ApiError extends Error {
  status;
  message;

  constructor(status, from, message) {
    super(message);
    this.status = status;
    this.message = message;
    this.from = from;
  }
}

export function customResponse(res, error, ApiError) {
  if (error instanceof ApiError) {
    res.status(error.status).json({ message: error.from + ' ' + error.message, success: false });
  } else {
    res.status(500).json({ message: `L O G U P: ${error.message}`, success: false });
  }
}
