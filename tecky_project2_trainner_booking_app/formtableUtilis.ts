import fs from "fs"
import { Request } from "express"

import formidable, { Fields, Files } from 'formidable'
import IncomingForm from 'formidable/Formidable'

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 20000 * 1024 ** 2, // the default limit is 200KB
  filter: part => part.mimetype?.startsWith('image/') || false,
  multiples:true,
})

export function formParse(form: IncomingForm, req: Request) {
    return new Promise<{fields:Fields, files:Files}>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err)
            } else {
                resolve({ fields, files })
            }
        });
    })
}

export function formObjectToArray<T>(files: T[] | T | undefined): T[] {
    if (Array.isArray(files)) {
      return files
    }
    if (!files) {
      return []
    }
    return [files]
}