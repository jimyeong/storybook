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