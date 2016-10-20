module.exports = {
    checksum: function(chars) {
        let checksum = [];
        if (!Array.isArray(chars)) {
            chars = [chars];
        }

        let sum = chars.reduce((a, b) => a + b, 0).toString(16).toUpperCase();
        for (byte of sum) {
            checksum.push(parseInt(byte.charCodeAt(0).toString()));
        }
        return checksum;
    },

    asciiToHex: function(chars) {
        function toHex(char) {
            return "0x" + char.charCodeAt(0).toString(16);
        }

        if (!Array.isArray(chars)) {
            return toHex(chars.toString());
        }

        let result = []
        for (char of chars) {
            result.push(toHex(char.toString()));
        }

        return result;
    }
};
