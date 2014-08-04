# @cjsx React.DOM

window.React = require("react")
request = require("superagent")

CalEvent = React.createClass(
	displayName: "CalEvent"

	_formatTime: (time) ->
		time = time.substring(0, time.length - 6)
		parts = time.split(":")
		hour = parts[0]
		minutes = parts[1]
		if hour > 12
			time = (hour - 12) + ":" + minutes + "PM"
		else if hour is 0
			time = 12 + ":" + minutes + "AM"
		else if hour is 12
			time += "PM"
		else
			time += "AM"

	_formatDate: (date) ->
		date = date.split("-")
		eventYear = date.shift()
		date.push eventYear
		date = date.join("/")
		date

	render: ->
		event         = @props.event
		eventDateTime = @props.event.start.dateTime
		eventDateTime = eventDateTime.split("T")
		eventTime     = @_formatTime(eventDateTime[1])
		eventDate     = @_formatDate(eventDateTime[0])
		<div className="event">
			<dt className="event__title">{event.summary}</dt>
			<span className="event__location">{event.location}</span>
		</div>
)

CalEvents = React.createClass
	displayName: "CalEvents"
	propTypes:
		calendarID: React.PropTypes.string.isRequired
		apiKey: React.PropTypes.string.isRequired

	getInitialState: ->
		events: []

	componentDidMount: ->
		request.get("https://www.googleapis.com/calendar/v3/calendars/" + @props.calendarID + "/events?fields=items(summary,id,location,start)&key=" + @props.apiKey).end ((res) ->
			events = res.body.items
			today = new Date().toISOString()
			index = 0
			events.forEach (event) ->
				index++
				if event.start.dateTime > today
					console.log event.start.dateTime
					#if event.summary is "Beer Day" or event.summary is "Beer Day!"
					console.log event.summary
					#events.slice(events.indexOf(event.id))
					console.log index
					return index
			#console.log events
			@setState events: res.body.items
			return
		).bind(this)
		return

	render: ->
		<div className="stupid"></div>

React.renderComponent(
	<CalEvents apiKey="AIzaSyAotSPxQX5BChTs_ImoCc07YOdBnVQgdoI" calendarID="vinspee.me_53uht9cl6qvg98dvbsa4er7hf0@group.calendar.google.com" />, document.querySelector("[data-component=events-list]")
)

module.exports = CalEvents
