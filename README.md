# 실시간 공공 자전거 대여 정보를 제공하는 mashup website 구현(2021.11.24 완성)

## 구축하려는 mashup 소개
  서울특별시 공공자전거 실시간 대여정보에 대한 Open API를 이용하여 사용자가 대여소를 선택하면 해당 대여소의 거치되어 있는 자전거 수와 거치율에 대한 실시간 정보를 제공한다.
 더하여 google의 Maps API를 이용하여 대여소의 위치를 지도로 보여주는 서비스를 융합하여 Mashup을 구축하려고 한다. 

## 사용자가 사용 가능한 기능

- 공공자전거 대여소를 입력/선택 또는 선택하여 조회할 수 있다.
- 조회한 대여소들을 같이 볼 수 있다.
- 조회한 대여소에 대해 조회한 시간, 현재 대여소에서 거치되어 있는 자전거 수, 거치율에 대한 정보를 얻을 수 있다.
- 최근 조회한(조회 버튼을 눌렀을 때의 선택한 대여소/RELOAD 버튼을 눌러 정보를 다시 가져온 대여소) 대여소의 위치를 지도로 확인할 수 있다.
- 최근 조회한 대여소가 무엇인지 알 수 있다.
- 조회한 대여소에 대해 ‘RELOAD’ 버튼을 이용하여 정보를 새로고침할 수 있다.
- 조회한 대여소에 대해 ‘DELETE’ 버튼을 이용하여 조회한 대여소 부분을 삭제할 수 있다.
- 이미 조회하고 있는 대여소를 다시 조회하면 이미 추가한 대여소 정보라는 안내창이 뜬다.(다시 추가되지 않는다.)
- 조회하는 대여소를 입력 또는 선택하지 않으면 대여소를 선택하라는 안내창이 뜬다.
- 오늘 날짜를 볼 수 있다.
- nav bar에서 로고를 볼 수 있다.
- nav bar 메뉴인 ‘Help?’ 부분에 커서를 두면 앱 사용 방법이 화면 상에 떠 확인할 수 있다.

## 사용한 Open API 설명
 서울특별시 공공자전거 실시간 대여정보이다. 간단히 설명하면 대여소별 실시간 자전거 대여가능 건수, 거치율, 대여소 위치정보를 제공한다. 이때 자전거 거치율은 거치된 자전거 대수 / 총 거치대 수량으로 나온 결과이다. 또한, 자전거 주차 총 건수는 공식 거치대와 거치대 외에 거치되어 있는 자전거의 수량을 다 더한 값이다.
![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/57412dfa-64a2-475c-8372-f0d3895819cc)

제공하려는 서비스를 구현하기 위해 출력값 2~7을 이용하였다. 특히 API를 요청할 때 마다 실시간으로 데이터를 조회하여 표출되고 있음을 이용하였다.

1) 대여소 ID와 대여소 이름 : 
 	 두 출력의 사용 용도를 간단히 설명하자면 조회한 대여소에 대해 카드를 동적으로 생성하여 정보를 보여주었기 때문에 무엇을 조회한 것인지 값을 넘기거나 동적으로 생성한 태그들의 id를 설		정하기 위해 쓰였고 이는 새로 고침을 위한 reload와 카드를 다시 지우기 위한 delete가 특정 카		드를 지우거나 새로 정보를 얻을 수 있게 해주었다. 또한, 사용자가 대여소 이름을 조회하기 위해 	입력/선택하는 공간에나 동적으로 생성되는 카드에서 조회한 대여소 이름을 보여주기 위해 쓰이기도 하였다. 
2) 자전거주차총건수, 거치율
	동적으로 생성한 카드에서 조회한 대여소의 대해 사용자에게 보여주는 정보로써 사용되었다.
3) 위도, 경도
	최근 조회한 대여소를 google map으로 표현하기 위해 위도, 경도 데이터를 사용하였다.

## 적용한 BootStrap
1) containers
	반응형 고정 너비 컨테이너를 사용하였다.
2) nav bar
	 로고인 ‘RPRI’을 강조하기 위해 .navbar-brand 클래스를 사용하였다. nav-item 클래스를 이용하여 네비게이션 바에서 메뉴 ‘Help?’를 하나 추가해주었다. 부연 설명을 추가하자면 메뉴 		‘Help?’에 커서를 올려두면 이용방법이 적혀있는 상자가 화면 상에 표시된다. 이는 css로 구현하		였다. 
	
 ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/044c01c2-4b26-4851-9bcb-d90d827b80fc)

3) badge
	오늘 날짜를 보여주기 위해 사용하였다. 

 ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/390d7911-16f6-46e8-a172-651e21186368)

▷ ‘오늘 날짜 : 2021-11-24’ 부분이 badge를 사용한 부분이다.
4) Grids
	선택한 대여소 정보 카드들이 있는 공간과 지도가 보여지는 공간을 그리드 시스템을 이용하여 구분하였다.(대형 기기 화면을 기준으로 5:5(col-lg-5)로 나누었다.)
	 밑에 사진들에서 보이다시피 컴퓨터 화면에서는 같은 선상에 위치해 있고 휴대폰 화면에서는 지도가 보여지는 공간이 아래로 내려간 것을 확인할 수 있다.

 ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/5bd14beb-84ea-4cc3-ab8d-e61ea7a451ee)

 ▷ 컴퓨터에서의 화면

 ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/d4b8a484-7a30-473b-b979-8eeaaaf67b94)

 ▷ 휴대폰에서의 화면

5) Text/Typography
5-1) mark
	‘선택한 대여소 정보’를 강조하기 위해 mark 태그를 이용하였다.
	![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/f2d60a62-8f84-407b-aee5-c57b0cbc3736)

5-2) cord
	‘rental stations’을 강조하기 위해 cord 태그를 이용하였다.
  
  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/49788ef2-8913-4a82-976f-8bc5d5802a4b)

6) Colors 
	footer 부분의 내용들은 ‘text-muted’을 이용해서 색을 지정해주었다.

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/c50400a6-0ecd-40d5-8ff3-287d8a934b22)

8) Alerts
	 원하는 대여소를 선택한 후 조회 버튼을 누르게 되면 어디에 정보가 뜰 것인지를 알려주기 위		해 Alerts 기능을 이용하였다. 특히 경고 메시지를 닫을 수 있게 하기 위해 alert 컨테이너에 .alert-dismissble 클래스를 추가하고 버튼 요소에 class=“close” 및 data-dismiss=“alert”를 작성해주었다.

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/7152f199-a587-4ffe-aca4-d87b129a5e2f)

10) Button 
	 앞서 설명에 나왔던 ‘RELOAD’ 버튼과 ‘DELETE’버튼의 클래스에 btn btn-primary 또는 btn 		btn-outline-primary를 추가해주어 버튼 스타일을 적용하였다.

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/287695a4-8149-4ecc-8b52-ac2e52f60299)

11) Cards
	 조회한 정보들을 동적으로 카드를 생성하여 보여주기위해 사용하였다. 적용한 결과는 다음과 같다. 카드에 테두리는 따로 주지 않았다.

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/0c34f473-5dbd-4682-b6d9-4d4852ab736a)

 지도를 보기 위해 이 곳을 누르라는 문구가 적혀 있는 부분도 카드로 생성해주었다.

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/80e611ed-2cdd-4e84-a4b6-2dcb0ab19759)

## 로고 이미지 만들어서 홈 화면에 추가하기 
로고 이미지는 ‘bicycle_logo.png’를 사용하였다.

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/96f8edf1-ca13-49a1-9e22-7b5883be676b)

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/a9884103-23d1-4a4a-9a8b-80f112078b16)

## 앱 화면에서 Address Bar 감추기

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/8eb579fa-17c4-4ad2-a79f-f4333f38b9aa)

  ![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/1b232d4c-13fe-4be2-b50b-5b35225af7d8)

▷ 코드를 위와 같이 작성하였고 이후 결과에서 보이다시피 주소 바가 감춰진 모습이다.

## Dothome hosting
dothome에 호스팅하였다. url은 다음과 같다.
“ http://eunjin5018.dothome.co.kr/wp/bicycle.html ”
>> 현재는 유효 기간이 지나 완성된 모습을 볼 수 없다.

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/f9ab1a8c-d745-4369-bfe9-62635b73a8bd)

## 사용 예시
* 처음 시작 화면

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/5f163756-a99e-47a9-85f0-c433a338ee2c)

* ‘망원역 1번 출구’ 대여소를 조회한 모습 

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/0fe5a854-3043-4ac8-b1ba-014c6644e0e3)

* 다시 ‘망원역 1번 출구를 조회했을 때 모습

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/541968bf-63c7-4ba2-83d6-f17af940c64a)

* ’RELOAD‘ 버튼을 눌렀을 때 눌렀을 때의 기준으로 정보를 다시 불러온 모습

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/bb3269cf-9dc0-4b2f-8b7d-9ec1d4c188df)

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/dbc1e648-a1b4-4332-9a03-d0ff0a45fd1d)

* ‘Delete’ 버튼을 눌렀을 때의 모습

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/3aca4fe9-91ed-48bd-b25e-ebdec3bbc4ec)

 ▷ 조회했던 대여소 카드가 없어진 모습이다.

* 조회한 대여소들은 삭제하지 않으면 같이 볼 수 있다.

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/a8be4166-f596-47d4-9904-5309ba9eba2e)

* 지도 map은 toggle을 이용했기 때문에 위의 카드를 누르기 전에 보이지 않다가 누르면 보여진다. 최근 조회한 대여소에 대한 map이 보여지는 모습이다.

![image](https://github.com/jeoneunjin/mashup-web-project/assets/67683170/c9c5c552-f049-45bd-91f4-59cce3290fd3)


