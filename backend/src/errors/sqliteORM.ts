import { QueryFailedError } from "typeorm/error";


export default function clientErrorHandler(err, req, res, next) {
  if (err instanceof QueryFailedError) {
    const [, code, message, dbField] = err.driverError.toString().split(': ')

    // interface ErrExistingField {
    //   error: string,
    //   field: string
    // }
    if (code === 'SQLITE_CONSTRAINT' && message === 'UNIQUE constraint failed') {
      const field = dbField.split('.').pop()

      res.json({ error: "already-exists", field })
      return
    }

    // Probably is not necessary more...
    //
    // // interface ErrForeingKey {
    // //   error: string
    // // }
    // if (code === 'SQLITE_CONSTRAINT' && message === 'FOREIGN KEY constraint failed') {
    //   res.json({ error: "delete your notes before delete your account" })
    //   return
    // }
  }

  // FIX THIS BEFORE PRODUCTION
  res.json({ error: err })
}
