'use strict'
const symlinkDir = require('symlink-dir')
const path = require('path')

Promise.all([
    symlinkDir('prisma', 'backend/prisma'),
    // symlinkDir('node_modules/@prisma/client', 'backend/node_modules/@prisma/client'),
    // symlinkDir('node_modules/.prisma', 'backend/node_modules/.prisma'),
    symlinkDir('prisma', 'frontend/prisma'),
    // symlinkDir('node_modules/@prisma/client', 'frontend/node_modules/@prisma/client'),
    // symlinkDir('node_modules/.prisma', 'frontend/node_modules/.prisma'),
])
  .then(result => {
    console.log(result)
  })
  .catch(err => console.error(err))
