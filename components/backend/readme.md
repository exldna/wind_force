# Backend component

As described in the root `readme.md`, this component
contains the core logic of the application.
The logic is divided into different domains.

## Workspace structure

`/crates/server` provides the main binary.

`/crates/services` domains related code

`/crates/proto` protobuf schema definition

`/crates/migrate` database migrations

## Useful commands

__Open documentation__
```bash
$ cargo doc --open --no-deps --workspace
```

__Update `workspace-hack`__
```bash
$ cargo hakari generate
```

## Domains

### _Schedule_

The main goal of this domain is to provide useful
tooling for instructors. The core concept here is
the instructors _schedule_, which is just a list
of planned jobs. The planned job we call _event_,
so basically the _schedule_ is the set of _events_.

As instructors have to specify the types of jobs
they can do, the company provides the determine
set of _products_.

Students and instructors need a way to schedule when
_events_ have to be done. That's exactly what
_slots_ are for. The company provides a timetable.
Instructors indicate the _slots_ when they are free to work,
and students can see _slots_ when instructors are available.
However, the timetable sometimes has to be changed and
some events may require more than one slot, so we represent
them as a time span: when the event begins and when it ends.

Summary, each _event_ may have:
- assigned _instructor_
- _product_ kind
- _time span_ when it scheduled

---
