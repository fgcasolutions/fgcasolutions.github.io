resource "aws_s3_bucket" "notifications" {
  bucket = var.notification_bucket
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  lifecycle_rule {
    expiration { days = 90 }
  }
}

resource "aws_iam_role" "notification_service" {
  name = "notification-service-role"
  assume_role_policy = data.aws_iam_policy_document.notification_assume.json
}

data "aws_iam_policy_document" "notification_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "notification_policy" {
  role   = aws_iam_role.notification_service.id
  policy = data.aws_iam_policy_document.notification_policy.json
}

data "aws_iam_policy_document" "notification_policy" {
  statement {
    actions   = ["s3:PutObject", "s3:GetObject"]
    resources = ["${aws_s3_bucket.notifications.arn}/*"]
  }
  statement {
    actions   = ["ses:SendEmail"]
    resources = ["*"]
  }
}

resource "aws_ses_domain_identity" "notifications" {
  domain = var.ses_domain
}
