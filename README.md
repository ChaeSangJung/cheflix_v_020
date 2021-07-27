# Cheflix

## react ver. up 16 -> 17 with react-redux

### exhaustive-deps-warning 해결법
    - React Hook useEffect has a missing dependency: 'xxx'. Either include it or remove the dependency array. (react-hooks/exhaustive-deps)
        - useEffect내에 사용하고 있는 state를 배열안에 추가시켜 달라는 의미.
#### 1. useEffect내 state를 넣어줌
```javascript
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1);
    }, [count]);

    const [count, setCount] = useState(0);

    useEffect(() => {
        // state = 0
        setCount(state => state + 1);
    }, []);
```
#### 2. useEffect 내부에 함수를 정의한 경우
```javascript
    const getInitNoti = async () => {
        const res = await apis.notification.getNotice(params);
        setNotiData(res.data.user_notices);
    };

    useEffect(() => {
        getInitNoti();
    }, [getInitNoti]);
```
useEffect내의 getInitNoti함수가 params라는 변수를 쓰기 때문에 이 값을 배열에 넣어줘야 경고가 나오지 않음.
```javascript
    const getInitNoti = async () => {
        const res = await apis.notification.getNotice(params);
        setNotiData(res.data.user_notices);
    };

    useEffect(() => {
        getInitNoti();
    }, [getInitNoti, params]);
```
useCallback를 이용하는 방법.
```javascript
    const getInitNoti = useCallback(async () => {
        const res = await apis.notification.getNotice(params);
        setNotiData(res.data.user_notices);
    }, [params]);

    useEffect(() => {
        getInitNoti();
    }, [getInitNoti]);
```
useCallback이 없다면 위 컴포넌트가 리렌더링 될때마다, 계속해서 getInitNoti함수를 만들게 되고, 새로운 참조값을 받기 때문에 getInitNoti함수를 실행하게 됨

useCallback을 정의 하면 params가 바뀔때 만 getInitNoti가 실행되어, 불필요한 함수 생성 및 실행을 막을 수 있음.