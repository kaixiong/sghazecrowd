import json, requests, re, os, linecache, types

class CachedLineList(object):
	
	def __init__(self, fname):
		self.__fname = fname
		
	def __getitem__(self, x):
		if type(x) is types.SliceType:
			return [linecache.getline(self.__fname, n+1) for n in range(x.start, x.stop, x.step)]
		else:
			return linecache.getline(self.__fname, x+1)
			
	def __getslice__(self, start, end):
		return self[start:end]

# A handler generates output. In this case, the output follows the JSON format.
class JsonHandler(object):
	
	def __init__(self, fname):
		self.__fname = fname
	
	def write(self, data):
		print 'start writing json'
		# assumes data is a list
		f = open(self.__fname, 'r+')
		jsondata = json.loads(f.readline())
		if len(jsondata) > 0:
			datalst = jsondata + data
		else:
			datalst = data
		f.truncate()
		f.write(json.dumps(datalst))		
		f.close()
		print 'complete writing json'
	
	def truncate(size = 0):
		f = open(self.__fname, 'w')
		f.truncate(size)
		f.close()

	def getLastID():
		f = open(self.__fname, 'r')
		data = json.loads(f.readline())
		ID = len(data)
		f.close()
		return ID

# This reads the original data (in tsv format)
class TsvData(object):
	
	def __init__(self, fname):
		self.__fname = fname
		self.__cache = CachedLineList(fname)
		self.__fields = self.__cache[0].strip().split('\t')
	
	def getFields():
		return self.__fields
	
	# ID shall correspond to row number. Returns a dictionary
	
	def getValues(self, ID):
		return dict(zip(['ID'] + self.__fields, [ID] + self.__cache[ID].strip().split('\t')))
		
	def getLastID(self):
		f = open(self.__fname, 'r')	
		ID = len(f.readlines()) 
		f.close()
		return ID
	
	def read(self, ID):
		return self.__cache[ID]

class Parser(object):

	def __init__(self, tsvfname, jsonfname):
		self.__tsvfname = tsvfname
		self.__tsvfile = TsvData(tsvfname)
		self.__jsonfname = jsonfname
		self.__jsonfile = JsonHandler(jsonfname)		

	def generateCoordinates(self, address):
		address = re.sub(r'(#[a-zA-Z0-9,/\-]+)', '', address)
		url = 'http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false' % address
		r = requests.get(url)
		if r.json()['status'] == 'OK':
			lat = float(r.json()['results'][0]['geometry']['location']['lat'])
			lng = float(r.json()['results'][0]['geometry']['location']['lng'])
			return lat, lng
		else:	
			# Raise exception to stop the program. No point running if already hit rate limit.
			raise Exception(''.join(['Google Map Request Denied for ', address]))

	def genesis(self):
		if len(open(self.__jsonfname, 'r+').readlines()) == 0 :
			self.update(True)
		else:
			self.update()		
			
	def update(self, genesis = False):
		jsonfile = self.__jsonfile
		tsvfile = self.__tsvfile
		jsonblock = []		
		if genesis == True:
			jsonfile.truncate()			)
			ID = 1 
		else:
			ID = jsonfile.getLastID() + 1
		while tsvfile.read(ID):
			values = tsvfile.getValues(ID)
			# if latitude and longitude are not provided in tsvfile, then invoke geocoding
			if 'latitude' not in values.keys() or 'longitude' not in values.keys():
				values['latitude'], values['longitude'] = self.generateCoordinates(values['address'])
			# if quantity is not provided in tsvfile, then assign one as the default quantity .
			if 'quantity' not in values.key():
				values['quantity'] = 1
			jsonblock.append(values)
			ID += 1
		jsonfile.write(jsonblock)	

test = Parser('data_22jun2013.tsv', 'data.json')
test.genesis()
	

