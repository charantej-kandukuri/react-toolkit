### html name tag

In HTML elements never use `name` tag
eg:

```
<input type={text} id="postTitle" name="postTitle /> // -- wrong
<input type={text} id="postTitle" /> // -- correct
```

### htmlFor

In HTML if we have label and input elements, we shoud define `htmlFor` in label and
`id` property in input element, both values should be same.

eg:

```
<label htmlFor="postTitle">Title:</label>
<input type="text" id="postTitle" />
```
