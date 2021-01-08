## 🚀 구현할 기능 목록

### 서비스 설명 기능

1. 사용자의 로그인 정보가 없다면 메인 페이지를 보여준다. ✅
2. 메인 페이지에는 해당 서비스에 대한 간략한 설명이 나와있도록 한다.

### 기본 로그인 기능

1. 사용자로부터 아이디와 비밀번호를 입력받는다. ✅
2. 아이디나 비밀번호를 입력하지 않았을 경우 해당 입력창 밑에 경고문구를 띄운다.
3. 입력한 아이디와 비밀번호가 회원 DB에 등록되어 있는지 확인한다.
4. 등록되어 있지 않다면 비밀번호 입력창 밑에 경고문구를 띄워 입력값을 확인하게 한다.
5. 등록되어 있다면 메인 페이지로 이동하며 세션을 유지한다.
6. 비밀번호는 암호화 과정을 거쳐야 한다(사용자에게 비밀번호가 보여지면 안됨).

### 기본 로그아웃 기능

1. 유지되던 세션을 없애고 메인페이지로 이동하도록 한다.

### 기본 회원가입 기능

1. 회원가입 버튼은 처음에는 비활성화되어있다.
2. 아이디, 비밀번호, 이메일을 입력받는다. ✅
3. 아이디의 중복여부를 확인해보고 중복된다면 입력창 밑에 안내 문구를 띄운다.
4. 아아디는 알파벳과 숫자로만 이루어져야 한다.
   - 이에 대한 안내문구를 아이디 입력창 밑에 띄운다.
   - 입력조건에 어긋날 시 안내문구를 바꿔서 보여준다.
5. 비밀번호는 8글자를 넘어가는지 확인한다.
6. 넘어가지 않는다면 안내문구를 입력창 밑에 띄우고 마저 입력하게 한다.
7. 이메일의 입력값이 '아이디@주소'형태인지 확인한다.
8. 위의 모든 조건들이 맞을 시 회원가입 버튼을 활성화 시킨다.
9. 회원가입 버튼 클릭시 입력값들을 DB에 저장하고 alert창을 띄운 후에 로그인 페이지로 이동한다.

### 소셜 로그인, 회원가입 기능

1. 소셜과 연동하여 로그인, 회원가입을 진행하도록 한다.

### 게시판 글 목록 기능

1. 로그인 정보가 있을 경우 게시판 페이지를 보여준다. ✅
2. 왼쪽에 메뉴바를 만들어 주제들을 정렬(오름차순)시킨다.
3. 첫번째 주제는 '전체'로 모든 게시글을 확인할 수 있도록 한다.
4. 처음 게시판 목록 페이지가 렌더링되면 전체 게시글 목록이 오른쪽에 보여지도록 한다.
5. 주제를 클릭하면 해당 주제에 맞는 게시글 목록을 볼 수 있도록 한다.
6. 게시글 목록에서 게시글은 시간순(최신순)으로 정렬된다.
7. 게시글의 제목, 업로드한 시간을 확인할 수 있다.
8. 한 페이지당 최대 게시글의 개수는 15개이다.
9. 해당 주제에 관한 전체 게시글의 개수가 최대 게시글의 개수를 넘을 경우 다음 페이지로 이동할 수 있도록 아래쪽에 번호버튼을 생성한다.
10. 게시글의 제목을 클릭하면 해당 게시글의 상세 페이지로 이동한다.
11. 작성된 게시글이 없을 경우에는 '작성된 게시글이 없습니다.' 문구 출력하기
12. 작성 버튼 클릭 시 게시글 작성 페이지로 이동하기
13. 특정 게시글을 삭제할 수 있도록 한다.
    - 게시글을 선택(체크박스로 구현)한 후에 삭제버튼을 클릭하면 alert창을 띄운다.
    - 확인버튼이 클릭되면 해당 게시글들을 삭제한다.

### 게시글 작성 기능

1. 제목의 길이는 20자 이하로 제한한다.
2. 20자를 넘을 시 안내문구를 띄우고 더이상 입력되지 않도록 한다.
3. 게시글의 주제를 입력받는다(select 태그 이용).
4. 녹음파일을 업로드한다.
5. 파일 확장자를 확인하여 녹음파일만 올릴 수 있도록 한다.
   - API에서 허용하는 확장자 확인하기
6. 파일을 업로드하면 파일명도 함께 표시되도록 한다.
7. 상세설명의 길이는 100자 이하로 제한한다.
8. 100자를 넘을 시 alert창을 띄우고 더이상 입력되지 않도록 한다.
9. 현재 글자수를 실시간으로 업데이트하여 상세설명 입력창안에 출력한다. (다른거 해놓고 하기)
10. 등록 버튼을 누르면 DB에 저장되도록 하고 해당 게시글의 상세 페이지로 이동하도록 한다.
11. 취소 버튼을 누르면 alert창을 띄워 한번 더 확인하게 한다.
12. 사용자가 alert창의 확인버튼을 누른다면 이전 페이지로 이동하게 한다.

### 게시글 상세보기 기능

1. 해당 게시글의 제목, 상세설명, 키워드, 주제별 상세내용, 원본을 화면에 출력한다.
2. 수정버튼을 클릭 시 상세설명, 키워드를 수정할 수 있게 한다.
3. 상세설명은 100자 이내로 제한하고 이를 넘을 시 alert창을 띄우며 초과 입력을 막는다.
4. 키워드는 '#키워드명'형태로 입력해야 하며 중복여부를 확인해야 한다. (30개까지 설정가능)
5. 삭제버튼 클릭 시 alert창을 띄우고 확인을 눌렀을때 게시글을 삭제하고 목록 페이지로 이동한다.
6. 파일재업로드 버튼 클릭 시 파일선택창을 띄워 파일을 선택받는다.
7. 파일이 변경되면 페이지를 리렌더링해 변경된 결과를 확인할 수 있도록 한다.
