select id,
    event_name
from event
where id not in (
        select DISTINCT event_id
        from training_class
        where student_id = 9
    );
--^  without which one joined
--
    -- select which 1 joined
select DISTINCT event_id
from training_class
where student_id = 9;