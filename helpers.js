module.exports = {
    checksum: function(chars) {
        return Buffer.from(['0x30', '0x30']);
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
}
;
