## 🚀 구현할 기능 목록

### **서비스 설명 기능**

1. 사용자의 로그인 정보가 없다면 메인 페이지를 보여줌. ✅
2. 메인 페이지에는 해당 서비스에 대한 간략한 설명이 나와있도록 한다.

### 기본 로그인 기능

1. 사용자로부터 아이디와 비밀번호를 입력받는다. ✅
   - 아이디는 20자까지만 입력받는다. ✅
2. 아이디나 비밀번호를 입력하지 않았을 경우 해당 입력창 밑에 경고문구를 띄운다. ✅
3. 입력한 아이디와 비밀번호가 회원 DB에 등록되어 있는지 확인한다. ✅
4. 등록되어 있지 않다면 비밀번호 입력창 밑에 경고문구를 띄워 입력값을 확인하게 한다. ✅
5. 등록되어 있다면 메인 페이지로 이동하며 세션을 유지한다. ✅
6. 비밀번호는 암호화 과정을 거쳐야 한다(사용자에게 비밀번호가 보여지면 안됨). ✅

### 기본 로그아웃 기능

1. 유지되던 세션을 없애고 메인페이지로 이동하도록 한다. ✅

### 기본 회원가입 기능

1. 회원가입 버튼은 처음에는 비활성화되어있다. ✅
2. 아이디, 비밀번호, 이메일을 입력받는다. ✅
3. 아이디, 비밀번호, 이메일을 입력하지 않았을 경우 해당 입력창 밑에 경고문구를 띄운다. ✅
4. 아이디는 알파벳과 숫자로만 이루어지며 길이는 5~20자이다. ✅
   - 이에 대한 안내문구를 아이디 입력창 밑에 띄운다. ✅
   - 입력조건에 어긋날 시 안내문구를 바꿔서 보여준다. ✅
5. 비밀번호는 8글자를 넘어가는지 확인한다. ✅
6. 넘어가지 않는다면 안내문구를 입력창 밑에 띄우고 마저 입력하게 한다. ✅
7. 이메일의 입력값이 '아이디@주소'형태인지 확인한다. ✅
8. 위의 모든 조건들이 맞을 시 회원가입 버튼을 활성화 시킨다. ✅
9. 회원가입 버튼 클릭시 입력값들을 서버에 전달한다. ✅
   - 입력한 아이디가 이미 존재한다면 alert창을 띄운다. ✅
   - 회원가입에 성공하면 alert창을 띄운 후에 로그인 페이지로 이동한다. ✅

### 소셜 로그인, 회원가입 기능

1. 소셜과 연동하여 로그인, 회원가입을 진행하도록 한다.

### 게시판 글 목록 기능

1. 로그인 정보가 있을 경우 게시판 페이지를 보여준다. ✅
2. 왼쪽에 메뉴바를 만들어 주제들을 정렬(오름차순)시킨다. ✅
3. 첫번째 주제는 '전체'로 모든 게시글을 확인할 수 있도록 한다. ✅
4. 처음 게시판 목록 페이지가 렌더링되면 전체 게시글 목록이 오른쪽에 보여지도록 한다. ✅
5. 주제를 클릭하면 해당 주제에 맞는 게시글 목록을 볼 수 있도록 한다. ✅
6. 한 페이지당 최대 게시글의 개수는 10개이다. ✅
7. 해당 주제에 관한 전체 게시글의 개수가 최대 게시글의 개수를 넘을 경우에는 아래쪽에 페이지 버튼을 클릭하여 다른 페이지로 이동할 수 있다. ✅
8. 게시글의 제목을 클릭하면 해당 게시글의 상세 페이지로 이동한다. ✅
9. 작성된 게시글이 없을 경우에는 '작성된 게시글이 없습니다.' 문구 출력하기 ✅
10. 작성 버튼 클릭 시 게시글 작성 페이지로 이동하기 ✅
11. 특정 게시글을 삭제할 수 있도록 한다.
    - 삭제버튼 클릭시 체크박스를 생성시킨다. ✅
    - 게시글을 선택(체크박스로 구현)한 후에 삭제버튼을 클릭하면 confirm창을 띄운다. ✅
      - 게시글 전체 선택도 가능 ✅
      - 사용자가 게시글을 아무것도 선택하지 않았다면 게시글을 선택하라고 alert창을 띄움 ✅
    - 확인버튼이 클릭되면 삭제할 게시글들의 정보를 서버에 전달한다.
12. 게시글의 제목을 검색할 수 있다. ✅

### 게시글 작성 기능

1. 제목의 길이는 20자 이하로 제한한다. ✅
2. 20자를 넘을 시 안내문구를 띄우고 더이상 입력되지 않도록 한다. ✅
3. 게시글의 주제를 입력받는다(select 태그 이용). ✅
4. 녹음파일을 업로드한다. ✅
5. 파일을 선택하면 파일명이 표시되도록 한다. ✅
   - 파일명이 너무 길 경우에는 뒷부분을 생략한다. ✅
6. 상세설명의 길이는 100자 이하로 제한한다. ✅
7. 현재 글자수를 실시간으로 업데이트하여 상세설명 입력창안에 출력한다. (다른거 해놓고 하기) ✅
8. 100자를 넘을 시 더이상 입력되지 않도록 한다. ✅
9. 등록 버튼을 누르면 입력 정보들을 서버에 전달하고 게시글 목록 페이지로 이동한다. ✅
   - 제목이나 파일을 입력(선택)하지 않았을 시 alert창을 띄우고 입력(선택)하게 한다. ✅
10. 취소 버튼을 누르면 confirm창을 띄워 한번 더 확인하게 한다. ✅
11. 사용자가 confirm창의 확인버튼을 누른다면 이전 페이지로 이동하게 한다. ✅

### 게시글 상세보기 기능

1. 해당 게시글의 제목, 상세설명, 키워드, 주제별 상세내용, 원본을 화면에 출력한다. ✅
2. 수정버튼을 클릭 시 게시글 수정 페이지로 이동한다. ✅
3. 삭제버튼 클릭 시 confirm창을 띄운다. ✅
   - 확인을 눌렀을 경우 게시글의 정보를 서버에 전달한다.
   - 이후에 게시글 목록 페이지로 이동한다.
   - 취소를 눌렀을 경우 confirm창을 없앤다. ✅
4. 파일변경 버튼 클릭 시 파일선택창을 띄운다. ✅
   - 파일 선택 후 서버에 변경 파일 정보를 보낸다.
   - 취소버튼 클릭 시 선택창을 없앤다. ✅
5. 파일이 변경되면 페이지를 리렌더링해 변경된 결과를 확인할 수 있도록 한다.
6. 본문 영역 밑에는 같은 주제의 게시글 목록을 보여준다.
   - 한페이지에 4개까지만 표시한다.
   - 게시글 클릭 시 해당 게시글의 상세페이지로 이동한다. ✅

### 게시글 수정 기능

1. 처음 페이지가 렌더링 될때 각 입력창에는 게시글의 내용이 담겨져 있어야 한다.
2. 게시글의 원본을 제외한 모든 항목을 수정할 수 있도록 한다. ✅
3. 키워드는 '#키워드명' 형태로 입력해야 한다. (30개까지 설정가능)
   - 입력창에서 spacebar를 입력했을 경우 '#'을 자동 생성한다. ✅
   - 입력창에 focus가 들어올 경우 '#'를 자동 생성한다. ✅
     - 입력된 키워드가 이미 존재할 경우 ' #'가 입력됨 ✅
     - 입력된 키워드가 없다면 '#'만 입력 ✅
   - 중복된 키워드를 입력할 시 alert창을 띄운다. ✅
   - 키워드가 30개를 넘을 시 alert창을 띄운다. ✅
4. 수정 버튼을 클릭 시 변경 내용을 서버에 전달하고 상세보기 페이지로 이동한다.
5. 취소 버튼을 클릭 시 상세보기 페이지로 바로 이동한다.
