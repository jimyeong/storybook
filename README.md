### 1. version Issues!
버전이 바뀌면서, 스펙이 바뀌었나보다. 강의에서 쓰는 UI 모듈들이 제대로 작동을 안해서 삽질했다. 약 한시간.. 이럴 땐 걍, 강의 버리고 공식 홈페이지 가서 소스 수정할 것   
### 2. populate method in mongoose
```
{user: 60308878af22b34d5f7be848} -> 아래와 같이, join 같이 데이터를 가져온다.
{
    user:   {
                 _id: 60308878af22b34d5f7be848,
                 googleID: '108374402942246835298',
                 firstname: 'jimyeong',
                 email: 'dev.jimmy1992@gmail.com',
                 image: 'https://lh4.googleusercontent.com/-fZbU-iAaj-E/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckouB1HuRl2IpbSPM3KBrt6x2IZSA/s96-c/photo.jpg',
                 __v: 0 
            }
}
```

### 3. res.locals , app.locals, req.app.locals
1. res.locals 의 프로퍼티들은, request의 라이프타임 동안만 유요하다. 클라이언트 사이드로 변수들을 보낼 수 있고, 변수들은 오직 거기서만 활용할 수 있다.
2. req.app.locals 미들웨어에서 app의 지역변수들을 사용할 수 있도록 해준다.
3. app.locals 자바스크립트 객체이고, 프로퍼티들은, 애플리케이션 내의 지역변수들이다. 애플리케이션의 라이프타임동안 유효하다.  

### 4. 
```
// 한번 node app.js 가 실행되고, 라우터가 등록되면
// 다시 app.js 로 가는 게 아니다.
// router 에 의해서 정해진 스코프로 들어감
// app은 그냥 start point 일뿐

// 아무리 excutedNumber 을 올리려고 해도 올라가지 않음, 접근이 안됨
if(app.locals.excutedNumber == null){
    console.log("hihihihihihihi");
    app.locals.excutedNumber = 0;
}

app.locals.excutedNumber ++;
console.log(`app.locals.excutedNumber: ${app.locals.excutedNumber}`);
```

### 5. response, request 사이클동안만 사용할 수 있는 전역변수를 사용 하고 싶을 때,
```
// 이렇게 등록해주면 될줄 알았으나
// 문제는 req.user가 계속 null 이 나온다. 
// 심지어 로그인이 되어있는 상황에서, 
// 일단 메모를 남겨둔다. 

app.use((req, res, next)=>{
    // use를 어디서나 쓰고 싶기 때문에
    // 세션은 있는데, 여기선 찍히지 않는다.
    // res.locals.user = req.user||null;

    // 왜 여기서는 req.user 가 null 이 나오는 거지???

    // res.user = req.user || null;
    console.log("hi, would it be excuted over and over?");

    // null 이다, 이게 null이 아니라면 얼마나 좋을까
    // console.log(req.user);
    next();
})

```
