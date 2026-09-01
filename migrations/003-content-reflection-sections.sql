-- 서브메뉴 개편: 이론 -> 내용, 성찰 추가
-- (unit_content에는 아직 실제 데이터가 없어서 안전하게 제약만 교체)
alter table unit_content drop constraint if exists unit_content_section_check;
alter table unit_content add constraint unit_content_section_check
  check (section in ('objectives', 'text', 'content', 'task', 'reflection', 'criteria', 'rubric'));

-- 8학년 단원명 확정
update units set title = '연금술사', status = 'active' where grade = '8' and number = 1;
update units set title = '연설문', status = 'planned' where grade = '8' and number = 2;
update units set title = '시, 수필', status = 'planned' where grade = '8' and number = 3;
update units set title = '뮤지컬 빨래', status = 'planned' where grade = '8' and number = 4;
