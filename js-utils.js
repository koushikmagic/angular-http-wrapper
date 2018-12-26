let entry = function(data) {
	let _original = data,
		_value = data,
		wrapped = {
			map: cb => {
				_value =  utilObject.map(_value, cb);
				return wrapped;
			},
			filter: cb => {
				_value =  utilObject.filter(_value, cb);
				return wrapped;
			},
			reduce: (cb, init) => {
				_value =  utilObject.reduce(_value, cb, init);
				return wrapped;
			},
			get: (path, defaultValue, separator) => {
				_value =  utilObject.get(_value, path, defaultValue, separator);
				return wrapped;
			},
			has: (path, defaultValue, separator) => {
				_value =  utilObject.has(_value, path, defaultValue, separator);
				return wrapped;
			}, 
			cloneDeep: () => {
				_value =  utilObject.cloneDeep(_value);
				return wrapped;
			},
			value: () => _value
		};
	return wrapped;
}

let utilObject = {
	map: function (ite, cb) {
			let ite = ite || [],
				arr = [],
				entries = Object.entries(ite),
				i;
			for (i = 0; i < entries.length; i++) {
				let curr = entries[i];
				if(typeof cb === "function") {
					arr.push(cb(curr[1], curr[0], ite))	
				} else if(typeof cb === "string") {
					arr.push(curr[1][cb]);
				}
				
			}
			return arr;
		},

		filter: function (ite, cb) {
			let ite = ite || [],
				arr = [],
				entries = Object.entries(ite),
				i;
			for (i = 0; i < entries.length; i++) {
				let curr = entries[i];
				if(typeof cb === "function") {
					cb(curr[1], curr[0], ite) && arr.push(curr[1]);
				} else if(typeof cb === "string") {
					curr[1][cb] && arr.push(curr[1]);
				}
				
			}
			return arr;
		},
		reduce: function (ite, cb, init) {
			let _ite = ite || [],
				arr = [],
				entries = Object.entries(ite),
				st = (typeof init === "undefined") ? 1 : 0,
				i,
				res = (typeof init === "undefined") ? entries[0][1] : init;

			if(!entries.length) { return init; }

			for (i = st; i < entries.length; i++) {
				let curr = entries[i];
				res = cb(res, curr[1], curr[0], ite)
			}
			return res;
		},
		get: (src, path = "", defaultValue, separator = ".") => {
			let o = src || {},
				_path = Array.isArray(path) ? path : path.split(separator),
				i, res = o;
				for (i = 0; i < _path.length; i++) {
					let key = _path[i];
					if(key in res) {
						res = res[key];
					} else {return defaultValue}
				}

			return res;
		},
		has: (src, path = "", defaultValue, separator = ".") => {
			let o = src || {},
				_path = Array.isArray(path) ? path : path.split(separator),
				i, res = o;
				for (i = 0; i < _path.length; i++) {
					let key = _path[i];
					if(key in res) {
						res = res[key];
					} else {return false}
				}

			return true;
		},
		cloneDeep: src => {
			return JSON.parse(JSON.stringify(src))
		}
	}

	let _ = Object.assign(entry, utilObject);