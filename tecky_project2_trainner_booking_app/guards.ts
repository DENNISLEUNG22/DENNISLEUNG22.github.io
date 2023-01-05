import { Request, Response, NextFunction } from 'express'
import './session'

export function requireLogin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    res.status(401)
    // res.json({ error: 'The request is not authenticated' })
    res.redirect('/login.html');
    return
  }
	next()
}
