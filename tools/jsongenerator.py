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

class JsonHandler(object):	
	# A handler generates output. In this case, the output follows the JSON format.
	def __init__(self, fname):
		self.__fname = fname
	
	def write(self, data):
		f = open(self.__fname, "a")
		jsondata = "".join([json.dumps(data), os.linesep])
		f.write(jsondata)
		print jsondata
		f.close()
	
	def truncate(size = 0):
		f = open(self.__fname, "w")
		f.truncate(size)
		f.close()

	def getLastID():
		f = open(self.__fname, "r")
		data = json.loads(f.readline())
		ID = len(data)
		f.close()
		return ID

# This reads the original data (in tsv format)
class TsvData(object):
	
	def __init__(self, fname):
		self.__fname = fname
		self.__cache = CachedLineList(fname)
		self.__fields = self.__cache[0].strip().split("\t")
	
	def getFields():
		return self.__fields
	
	# ID shall correspond to row number. Returns a dictionary
	
	def getValues(self, ID):
		return dict(zip(["ID"] + self.__fields, [ID] + self.__cache[ID].strip().split("\t")))
	
	def getCoordinates(ID):
		return self.getValues(ID)["lattitude"], self.getValues(ID)["longtitude"]
	
	def getLastID(self):
		f = open(self.__fname, "r")	
		ID = len(f.readlines()) 
		f.close()
		return ID
	
	def read(self, ID):
		return self.__cache[ID+1]

class Parser(object):

	def __init__(self, tsvfname, jsonfname):
		self.__tsvfile = TsvData(tsvfname)
		self.__jsonfile = JsonHandler(jsonfname)
		if len(open(jsonfname,"r+").readlines()) < 2:
			self.genesis()
		else:
			self.update()

	def generateCoordinates(self, address):
		address = re.sub(r'(#[a-zA-Z0-9,/\-]+)', "", address)
		url = 'http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false' % address
		r = requests.get(url)
		if r.json()['status'] == 'OK':
			lat = float(r.json()['results'][0]['geometry']['location']['lat'])
			lng = float(r.json()['results'][0]['geometry']['location']['lng'])
			return lat, lng
		else:
			print address
			raise Exception("Google Map Request Denied")

	def genesis(self):
		self.update(True)
			
	def update(self, genesis = False):
		jsonfile = self.__jsonfile
		tsvfile = self.__tsvfile
		jsonblock = []		
		if genesis == True:
			ID = 1 
		else:
			ID = jsonfile.getLastID() + 1
		while tsvfile.read(ID):
			values = tsvfile.getValues(ID)
			if 'latitude' not in values.keys() or 'longitude' not in values.keys():
				values['latitude'], values['longitude'] = self.generateCoordinates(values['address'])
			jsonblock.append(values)
			ID += 1
		jsonfile.write(jsonblock)	

test = Parser('data_22jun2013.tsv', 'data.json')		
	

