# Mandarin-English

Mandarin-English Vocabulary API is a REST API built with Node.js and Restify for retrieving Mandarin vocabulary words. It uses JSON Web Tokens for authentication and authorization.

## Project Setup

```
npm install
```

## Usage

### Get Words

Retrieve a list of Mandarin vocabulary words.

#### Endpoint

```
GET /words
```

#### Example Response

```
[
    {
        "_id": "6042f4c0476e3b42b249b547",
        "mandarin": "一",
        "pinyin": "yī",
        "english": "one",
        "wordId": 2,
        "updatedAt": "2021-03-06T03:19:28.351Z",
        "createdAt": "2021-03-06T03:19:28.351Z",
        "__v": 0
    },
    {
        "_id": "6042f521476e3b42b249b384",
        "mandarin": "是",
        "pinyin": "shì",
        "english": "be",
        "wordId": 4,
        "updatedAt": "2021-03-06T03:21:05.303Z",
        "createdAt": "2021-03-06T03:21:05.303Z",
        "__v": 0
    },
    …
]
```

### Get Single Word

Retrieve a single Mandarin vocabulary word by ID.

#### Endpoint

```
GET /words/:id
```

#### Example Response

```
{
    "_id": "604aea0d920f3700153d06c1",
    "mandarin": "学",
    "pinyin": "xué",
    "english": "study",
    "wordId": 50,
    "updatedAt": "2021-03-12T04:11:57.621Z",
    "createdAt": "2021-03-12T04:11:57.621Z",
    "__v": 0
}
```
