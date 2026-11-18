const fs = require('fs/promises')
const path = require('path')

// Directory and file path for logs
const logDirectory = path.join(__dirname, '../logs')
const logFile = path.join(logDirectory, 'app.log')

// Formats timestamp, logs to console, and appends to logs/app.log
const writeLog = async (level, message) => {
    const timestamp = new Date().toISOString()
    const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`

    // Output to terminal
    if (level.toUpperCase() === 'ERROR') {
        console.error(logLine.trim())
    } else {
        console.log(logLine.trim())
    }

    // Append to file
    try {
        await fs.mkdir(logDirectory, { recursive: true })
        await fs.appendFile(logFile, logLine)
    } catch (err) {
        console.error("Failed to write to log file:", err.message)
    }
}

//Express Middleware: Logs every incoming HTTP request
const logger = async (req, res, next) => {
    await writeLog('HTTP', `${req.method} ${req.originalUrl || req.url}`)
    next()
}

//Helper methods: Clean 1-liners using the central writeLog function
logger.info = (message) => writeLog('INFO', message)
logger.error = (message) => writeLog('ERROR', message)
logger.debug = (message) => writeLog('DEBUG', message)
logger.warn = (message) => writeLog('WARN', message)

module.exports = logger
