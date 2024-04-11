## Set up
1. Chuyển vào thư mục web_source
```cmd
cd web_source
```
2. Install các module (và nên sử dụng node các phiên bản 16.0 || 18.0 || 20.0)
```cmd
npm i 
```
3. Tải SQL Server ([here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)) & SQL Server Management Studio (SSMS) ([here](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)).
4. Ghi nhớ dòng MSSQLSERVER khi install xog SQL Server. !important
5. Dùng SSMS connect vào SQL Server local.
5. Chạy query db_mypw1.sql trong directory web_source/sql trong SSMS 
6. Tạo file tên .env trong thư mục web_source với 2 biến (thay Server thành tên server local).
```bash
DB_SERVER=Server
DB_NAME=mypw
```
## Debug
1. Chuyển thư mục root thành web_source. 
```bash
npm start
```
#   M y P W - W e b s i t e  
 #   M y P W - W e b s i t e  
 #   M y P W - W e b s i t e  
 #   M y P W - W e b s i t e  
 