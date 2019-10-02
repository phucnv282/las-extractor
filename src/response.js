'use strict';

class Response {
	constructor(code, reason, content) {
		this.code = code;
		this.reason = reason;
		this.content = content;
	}
}

module.exports = function response(code, reason, content) {
	code = code || 200;
	reason = reason || "";
	content = content || {};
	return new Response(code, reason, content);
};
