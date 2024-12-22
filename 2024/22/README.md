# benches

## part 1

### with cache

`iqr bench part 1:    835.9595873999999 ms`

### w/o cache

`iqr bench part 1:    90.06872211111107 ms`

### one function gen_secret

`iqr bench part 1:    82.40754644444445 ms`

### bitmask

```node
> Math.pow(2,24)
16777216

> (16777216n).toString(2)
'1000000000000000000000000'

> parseInt(0xFFFFFF).toString(2)
'111111111111111111111111'
```

`iqr bench part 1:    78.43958330000001 ms`

### remove Math.floor

`iqr bench part 1:    27.260408300000005 ms`