# twitter-es-api-practice

A small exsample to use twitter and elasticsearch API

## Usage
### download
```
git clone https://github.com/LightbulbCat/twitter-es-api-practice
cd twitter-es-api-practice
```

### config
```
cp config.sample.json config.json
vi config.json
```

### run
Before it, elasticsearch has to have a index 'twitter'.
To make it, for example, do `curl -XPUT localhost:9200/twitter`.
```
node index
```
