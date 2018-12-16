const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const password = new Buffer.from([1,3,5,3,6,2,7,2,9,13,11,53,56,95,25,95]).toString('hex')

const encrypt = (input) => {
    const iv = new Buffer.from(crypto.randomBytes(8)).toString('hex')
    const cipher = crypto.createCipheriv(algorithm,password,iv)
    let crypted = cipher.update(input, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return `${iv.toString('hex')}:${crypted.toString('hex')}`
}

const decrypt = (input) => {
    const iv = input.split(':')[0]
    const encrypted = input.split(':')[1]

    const decipher = crypto.createDecipheriv('aes-256-ctr',password,iv)
    let decrypted = decipher.update(encrypted,'hex','utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}