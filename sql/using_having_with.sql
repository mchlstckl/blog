use statistics
go

declare @fromDate datetime
set	@fromDate = '2008-05-01'

;with tmp_users
as (
    select  us.userID
            ,SUM(us.income) as income
            ,DATEPART(year, us.statDate) as d
            ,DATEPART(month, us.statDate) as f
    from    tbl_userStat us
    where   us.gameCode not in ('B2')
    group by
            us.userID
            ,DATEPART(year, us.statDate)
            ,DATEPART(month, us.statDate)
    having  SUM(us.income) >= 1500
),
levelIncome
as
(
    select  us.userID
            ,MAX(us.statDate) as dateLastAction
            ,SUM(us.income) as income
    from    tbl_userStat us
    where   us.gameCode not in ('B2')
    group by
            us.userID
)

select  t.userID
        ,count(*) numMonthsOver1500
        ,u.countryCode
        ,l.income as levelIncome
        ,l.dateLastAction
from	tmp_users t
join    levelIncome l
    on	l.userID = t.userID
join    tbl_user u
    on  u.userID = t.userID
where	u.userID not in (select userid FROM tbl_partner)
group by
        t.userID
        ,u.countryCode
        ,l.income
        ,l.dateLastAction

-- Temporary tables tmp_users and levelIncome
-- are no longer available here
